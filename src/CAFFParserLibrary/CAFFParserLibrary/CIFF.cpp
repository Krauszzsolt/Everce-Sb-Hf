#include "CIFF.h"
#include <stdexcept>
#include <utility>
#include <iostream>

unsigned char& Pixel::operator[](int index)
{
	if (index >= 0 && index < 4)
		return values[index];
	throw std::out_of_range("Pixel getter out of range");
}

Pixel::Pixel(unsigned char r, unsigned char g, unsigned char b, unsigned char a)
{
	values[0] = r;
	values[1] = g;
	values[2] = b;
	values[3] = a;
}

Pixel::Pixel(const Pixel& rhv)
{
	values[0] = rhv.values[0];
	values[1] = rhv.values[1];
	values[2] = rhv.values[2];
	values[3] = rhv.values[3];
}

Pixel& Pixel::operator=(const Pixel& rhv)
{
	values[0] = rhv.values[0];
	values[1] = rhv.values[1];
	values[2] = rhv.values[2];
	values[3] = rhv.values[3];

	return *this;
}

CIFF::CIFF(): header_size(0), content_size(0), width(0), height(0), pixels(nullptr), caption(), tags()
{
	
}

CIFF::~CIFF()
{
	delete pixels;
}

CIFF::CIFF(const CIFF& rhv): 
	header_size(rhv.header_size), 
	content_size(rhv.content_size),
	width(rhv.width),
	height(rhv.height),
	caption(rhv.caption), 
	tags(rhv.tags)
{
	pixels = new Pixel[width * height];
	for (int i = 0; i < width * height; i++)
		pixels[i] = rhv.pixels[i];
}

CIFF::CIFF(CIFF&& rhv) :
	header_size(rhv.header_size),
	content_size(rhv.content_size),
	width(rhv.width),
	height(rhv.height),
	caption(std::move(rhv.caption)),
	tags(std::move(rhv.tags))
{
	pixels = rhv.pixels;
	rhv.pixels = nullptr;
}

CIFF& CIFF::operator=(const CIFF& rhv)
{
	delete[] this->pixels;

	this->header_size = rhv.header_size;
	this->content_size = rhv.content_size;
	this->width = rhv.width;
	this->height = rhv.height;
	this->caption = rhv.caption;
	this->tags = rhv.tags;

	pixels = new Pixel[width * height];
	for (int i = 0; i < width * height; i++)
		pixels[i] = rhv.pixels[i];

	return *this;
}

CIFF& CIFF::operator=(CIFF&& rhv)
{
	delete[] this->pixels;

	this->header_size = rhv.header_size;
	this->content_size = rhv.content_size;
	this->width = rhv.width;
	this->height = rhv.height;
	this->caption = std::move(rhv.caption);
	this->tags = std::move(rhv.tags);

	pixels = rhv.pixels;
	rhv.pixels = nullptr;

	return *this;
}

unsigned long long CIFF::getWidth()
{
	return width;
}

unsigned long long CIFF::getHeight()
{
	return height;
}


Pixel& CIFF::getPixel(unsigned int i, unsigned int j)
{
	if (i < height && j < width)
		return pixels[i * width + j];
	throw std::out_of_range("CIFF::getPixel out of range");
}

CIFF_format_exception::CIFF_format_exception(const char* c): code(c)
{
	
}


std::istream& operator>>(std::istream& is, CIFF& ciff)
{
	char inputbytes[8];
	is.read(inputbytes, 4);

	if (!(inputbytes[0] == 'C' && inputbytes[1] == 'I' && inputbytes[2] == 'F' && inputbytes[3] == 'F'))
		throw CIFF_format_exception("Wrong magic header");

	is.read(inputbytes, 8);
	ciff.header_size = *((unsigned long long*) inputbytes);

	is.read(inputbytes, 8);
	ciff.content_size = *((unsigned long long*) inputbytes);
	
	is.read(inputbytes, 8);
	ciff.width = *((unsigned long long*) inputbytes);

	is.read(inputbytes, 8);
	ciff.height = *((unsigned long long*) inputbytes);

	if (ciff.content_size != ciff.height * ciff.width * 3)
		throw CIFF_format_exception("Wrong content size");

	ciff.caption = "";

	char c;
	is.read(&c, 1);
	while (c != '\n' && c != '\0')
	{
		ciff.caption += c;
		is.read(&c, 1);
	}

	unsigned long long header_index = ciff.caption.length() + 1 + 36;

	while (header_index < ciff.header_size)
	{
		char c;
		std::string newTag;
		is.read(&c, 1);
		while (c != '\0')
		{
			newTag += c;
			is.read(&c, 1);
		}
		header_index += newTag.length() + 1;
		ciff.tags.push_back(newTag);
	}

	if (header_index != ciff.header_size)
		throw CIFF_format_exception("Wrong headersize or tags");

	delete[] ciff.pixels;

	ciff.pixels = new Pixel[ciff.width * ciff.height];
	for (unsigned long long i = 0; i < ciff.width * ciff.height; i++)
	{
		is.read(inputbytes, 3);
		inputbytes[0] = *(reinterpret_cast<unsigned char*>(&inputbytes[0]));
		inputbytes[1] = *(reinterpret_cast<unsigned char*>(&inputbytes[1]));
		inputbytes[2] = *(reinterpret_cast<unsigned char*>(&inputbytes[2]));
		ciff.pixels[i] = Pixel(inputbytes[0], inputbytes[1], inputbytes[2], 255);
	}

	return is;
}
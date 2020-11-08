#pragma once
#include <string>
#include <list>
#include <istream>

class Pixel
{
public:
	Pixel(unsigned char r = 0, unsigned char g = 0, unsigned char b = 0, unsigned char a = 0);
	Pixel(const Pixel& rhv);
	Pixel& operator=(const Pixel& rhv);

	unsigned char& operator[](int index);

private:
	unsigned char values[4];
};

class CIFF
{
public:
	CIFF();
	~CIFF();
	CIFF(const CIFF& rhv);
	CIFF(CIFF&& rhv);
	CIFF& operator=(const CIFF& rhv);
	CIFF& operator=(CIFF&& rhv);
	unsigned long long getWidth();
	unsigned long long getHeight();

	Pixel& getPixel(unsigned int i, unsigned int j);

	friend std::istream& operator>>(std::istream& is, CIFF& ciff);

private:
	unsigned long long header_size, content_size;
	unsigned long long width, height;
	std::string caption;
	std::list<std::string> tags;
	Pixel* pixels;
};

class CIFF_format_exception : public std::exception
{
private:
	const char* code;
public:
	CIFF_format_exception(const char* c);
};

std::istream& operator>>(std::istream& is, CIFF& ciff);
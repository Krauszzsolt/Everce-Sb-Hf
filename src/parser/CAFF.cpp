#include "CAFF.h"
#include <iostream>

Date::Date() :
	year(0),
	month(0),
	day(0),
	hour(0),
	min(0)
{

}

CAFF::CAFF() : 
	header_size(0),
	num_anim(0), 
	creator_date(), 
	creator_len(0), 
	creator(), 
	durations(nullptr), 
	ciffs(nullptr)
{
}

CAFF::~CAFF()
{
	delete[] ciffs;
}

CAFF::CAFF(const CAFF& rhv):
	header_size(rhv.header_size),
	num_anim(rhv.num_anim),
	creator_len(rhv.creator_len),
	creator(rhv.creator),
	creator_date(rhv.creator_date)
{
	ciffs = new CIFF[num_anim];
	for (int i = 0; i < num_anim; i++)
	{
		ciffs[i] = rhv.ciffs[i];
		durations[i] = rhv.durations[i];
	}
}

CAFF::CAFF(CAFF&& rhv) :
	header_size(rhv.header_size),
	num_anim(rhv.num_anim),
	creator_len(rhv.creator_len),
	creator(rhv.creator),
	durations(rhv.durations),
	creator_date(rhv.creator_date),
	ciffs(rhv.ciffs)
{
	rhv.durations = nullptr;
	rhv.ciffs = nullptr;
}

CAFF& CAFF::operator=(const CAFF& rhv)
{
	header_size = rhv.header_size;
	num_anim = rhv.num_anim;
	creator_len = rhv.creator_len;
	creator = rhv.creator;
	creator_date = rhv.creator_date;

	delete[] ciffs;
	ciffs = new CIFF[num_anim];
	durations = new unsigned long long[num_anim];
	for (int i = 0; i < num_anim; i++)
	{
		ciffs[i] = rhv.ciffs[i];
		durations[i] = rhv.durations[i];
	}
	
	return *this;
}

CAFF& CAFF::operator=(CAFF&& rhv)
{
	header_size = rhv.header_size;
	num_anim = rhv.num_anim;
	creator_len = rhv.creator_len;
	creator = rhv.creator;
	creator_date = rhv.creator_date;

	delete[] ciffs;
	delete[] durations;
	ciffs = rhv.ciffs;
	durations = rhv.durations;
	rhv.ciffs = nullptr;
	rhv.durations = nullptr;

	return *this;
}

CAFF_format_exception::CAFF_format_exception(const char* c) : code(c)
{

}


std::istream& operator>>(std::istream& is, CAFF& caff)
{
	char inputbytes[8];
	while (!is.eof())
	{
		unsigned char blockId;
		unsigned long long blockLength;

		is.read(inputbytes, 1);
		if (is.eof())
		{
			return is;
		}
		blockId = *(reinterpret_cast<unsigned char*>(inputbytes));

		if (blockId < 1 || blockId > 3)
			throw CAFF_format_exception("Wrong block ID");

		is.read(inputbytes, 8);
		blockLength = *(reinterpret_cast<unsigned char*>(inputbytes));

		unsigned char y1, y2;
 		switch (blockId)
		{
		case 1:
			if (blockLength != 20)
				throw CAFF_format_exception("Wrong blockLength");

			is.read(inputbytes, 4);
			if (!(inputbytes[0] == 'C' && inputbytes[1] == 'A' && inputbytes[2] == 'F' && inputbytes[3] == 'F'))
				throw CAFF_format_exception("Wrong magic header");

			is.read(inputbytes, 8);
			caff.header_size = *(reinterpret_cast<unsigned long long*>( inputbytes));

			if (caff.header_size != 20)
				throw CAFF_format_exception("Wrong header_size");

			is.read(inputbytes, 8);
			caff.num_anim = *(reinterpret_cast<unsigned long long*>(inputbytes));

			delete[] caff.ciffs;
			caff.ciffs = new CIFF[caff.num_anim];
			caff.durations = new unsigned long long[caff.num_anim];
			break;

		case 2:
			is.read(inputbytes, 2);
			y1 = *(reinterpret_cast<unsigned char*>(&inputbytes[0]));
			y2 = *(reinterpret_cast<unsigned char*>(&inputbytes[1]));
			
			caff.creator_date.year = (int)y2 * 256 + (int)y1;

			is.read(inputbytes, 1);
			caff.creator_date.month = *(reinterpret_cast<unsigned char*>(inputbytes));

			is.read(inputbytes, 1);
			caff.creator_date.day = *(reinterpret_cast<unsigned char*>(inputbytes));

			is.read(inputbytes, 1);
			caff.creator_date.hour = *(reinterpret_cast<unsigned char*>(inputbytes));

			is.read(inputbytes, 1);
			caff.creator_date.min = *(reinterpret_cast<unsigned char*>(inputbytes));

			is.read(inputbytes, 8);
			caff.creator_len = *(reinterpret_cast<unsigned long long*>(inputbytes));

			caff.creator = "";
			for (int i = 0; i < caff.creator_len; i++)
			{
				is.read(inputbytes, 1);
				caff.creator += inputbytes[0];
			}

			break;
		case 3:
			is.read(inputbytes, 8);
			static int i = 0;
			if (i < caff.num_anim)
			{
				caff.durations[i] = *(reinterpret_cast<unsigned long long*>(inputbytes));
				is >> caff.ciffs[i];
				i++;
			}
			else
			{
				throw CAFF_format_exception("Too many CIFFs in the CAFF file");
			}
			
			break;
		}
	}

	return is;
}

unsigned char* CAFF::getBitMapPreview(unsigned long long size)
{
	unsigned char* bitmap = new unsigned char[size * size * 4 + 54];

	double* floatBitmap = new double[size * size * 4 + 54];

	bitmap[0] = 66; //Signature 1st byte
	bitmap[1] = 77; //Signature 2nd byte

	*reinterpret_cast<int*>(&bitmap[2]) = size * size * 4 + 54; //File size
	
	*reinterpret_cast<int*>(&bitmap[6]) = 0; //Free space = 0
	
	*reinterpret_cast<int*>(&bitmap[10]) = 54; //Bitmap starting index
	
	*reinterpret_cast<int*>(&bitmap[14]) = 40; //Header size
	
	*reinterpret_cast<int*>(&bitmap[18]) = size; //Picture width
	
	*reinterpret_cast<int*>(&bitmap[22]) = size; //Picture height
	
	*reinterpret_cast<short*>(&bitmap[26]) = 1; //Display
	
	*reinterpret_cast<short*>(&bitmap[28]) = 32; //Colordepth
	
	*reinterpret_cast<int*>(&bitmap[30]) = 0; //Compression
	
	*reinterpret_cast<int*>(&bitmap[34]) = 0; //File size (0 with no compression)
	
	*reinterpret_cast<int*>(&bitmap[38]) = 4096; //Pixel/meter horizontal
	
	*reinterpret_cast<int*>(&bitmap[42]) = 4096; //Pixel/meter vertical
	
	*reinterpret_cast<int*>(&bitmap[46]) = 0; //Palette colors (0 by default)
	
	*reinterpret_cast<int*>(&bitmap[50]) = 0; //Used colors (0 by default)

	for (int i = 0; i < size; i++)
	{
		for (int j = 0; j < size; j++)
		{
			int offset = (size * i + j) * 4 + 54;

			floatBitmap[offset] = 0.0;
			floatBitmap[offset + 1] = 0.0;
			floatBitmap[offset + 2] = 0.0;
			floatBitmap[offset + 3] = 0.0;
		}
	}

	unsigned int longerSide = (ciffs[0].getHeight() > ciffs[0].getWidth()) ? ciffs[0].getHeight() : ciffs[0].getWidth();

	unsigned int step = longerSide / size;
	unsigned int batchSize = (longerSide + size - 1) / size;
	if (batchSize % 2 == 0)
		batchSize++;

	PaddedCiffProxy proxy(ciffs[0]);


	for (int i = 0; i < size; i++)
	{
		for (int j = 0; j < size; j++)
		{
			int offset = (size * i + j) * 4 + 54;

			int i2 = (float)i / (float)size * (float)longerSide + batchSize / 2;
			int j2 = (float)j / (float)size * (float)longerSide + batchSize / 2;

			for (int k = i2 - (int)batchSize / 2; k <= i2 + (int)batchSize / 2; k++)
				for (int l = j2 - (int)batchSize / 2; l <= j2 + (int)batchSize / 2; l++)
				{
					if (k >= 0 && k < longerSide && l >= 0 && l < longerSide)
					{
						for (int p = 0; p < 4; p++)
						{
							floatBitmap[offset + p] += (double)proxy.getPixel(k, l)[p] / (double)(batchSize * batchSize);
						}
					}
				}
		}
	}

	for (int i = 0; i < size; i++)
	{
		for (int j = 0; j < size; j++)
		{
			int offset = (size * i + j) * 4 + 54;

			bitmap[offset] = (unsigned char)floatBitmap[offset + 2];  //RGB2BGR
			bitmap[offset + 1] = (unsigned char)floatBitmap[offset + 1];
			bitmap[offset + 2] = (unsigned char)floatBitmap[offset];
			bitmap[offset + 3] = (unsigned char)floatBitmap[offset + 3];

		}
	}

	return bitmap;
}

PaddedCiffProxy::PaddedCiffProxy(CIFF& ciff): ciff(ciff)
{
	width = ciff.getWidth();
	height = ciff.getHeight();

	if (width > height)
	{
		heightDiff = (width - height + 1) / 2;
		widthDiff = 0;
	}
	else
	{
		heightDiff = 0;
		widthDiff = (height - width + 1) / 2;
	}
}

Pixel PaddedCiffProxy::getPixel(unsigned int i, unsigned int j)
{
	int longerSide = height > width ? height : width;

	if (i < heightDiff || i > longerSide - heightDiff)
	{
		return Pixel(0, 0, 0, 0);
	}

	if (j < widthDiff || j > longerSide - widthDiff)
	{
		return Pixel(0, 0, 0, 0);
	}
	
	return ciff.getPixel(i - heightDiff, j - widthDiff);
}

#pragma once
#include "CIFF.h"

struct Date
{
	Date();
	unsigned short year;
	unsigned char month;
	unsigned char day;
	unsigned char hour;
	unsigned char min;
};

class CAFF
{
public:
	CAFF();
	~CAFF();
	CAFF(const CAFF& rhv);
	CAFF(CAFF&& rhv);
	CAFF& operator=(const CAFF& rhv);
	CAFF& operator=(CAFF&& rhv);

	unsigned char* getBitMapPreview(unsigned long long size);

	friend std::istream& operator>>(std::istream& is, CAFF& caff);


private:
	long long header_size, num_anim;
	Date creator_date;
	long long creator_len;
	std::string creator;
	unsigned long long* durations;
	CIFF* ciffs;
};

class CAFF_format_exception : public std::exception
{
private:
	const char* code;
public:
	CAFF_format_exception(const char* c);
};

class PaddedCiffProxy
{
public:
	PaddedCiffProxy(CIFF& ciff);

	Pixel getPixel(unsigned int i, unsigned int j);
private:
	CIFF& ciff;
	int width, height;
	int heightDiff, widthDiff;
};

std::istream& operator>>(std::istream& is, CAFF& caff);
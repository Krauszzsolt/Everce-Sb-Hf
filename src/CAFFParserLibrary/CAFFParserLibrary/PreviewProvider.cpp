#include "pch.h"
#include "PreviewProvider.h"
#include "CAFF.h"
#include <sstream>

unsigned char* getPreviewOfCaff(const char* str, unsigned long long len, unsigned long long size)
{
	// test returning char array
	// it works
	/*unsigned char* buffer = new unsigned char[4];

	buffer[0] = 'x';
	buffer[1] = 'A';
	buffer[2] = '7';
	buffer[3] = 'e';

	return buffer;*/

	CAFF caff;
	std::stringstream ss;

	std::string s(str, len);

	ss.str(s);

	ss >> caff;

	return caff.getBitMapPreview(size);
}
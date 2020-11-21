#include "pch.h"
#include "PreviewProvider.h"
#include "CAFF.h"

unsigned char* getPreviewOfCaff(std::istream& is, unsigned long long size)
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

	is >> caff;

	return caff.getBitMapPreview(size);
}
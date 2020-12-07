#include "PreviewProvider.h"
#include "CAFF.h"
#include <sstream>

void PreviewProvider::getPreviewOfCaff(unsigned char* bitmap, const char* str, unsigned long long len, unsigned long long size)
{
	CAFF caff;
	std::stringstream ss;

	std::string s(str, len);
		
	ss.str(s);

	ss >> caff;

	unsigned long long arraysize = size * size * 4 + 54;

	unsigned char* backwards = new unsigned char[arraysize];

	caff.getBitMapPreview(backwards, size);

	for (int i = 0; i < 54; i++)
	{
		bitmap[i] = backwards[i];
	}
	
	for (int i = 0; i < size * size; i++)
	{
		int foffset = i * 4 + 54;
		int boffset = (size * size * 4 - 4) - i * 4 + 54;
		for (int k = 0; k < 4; k++)
		{
			bitmap[foffset + k] = backwards[boffset + k];
		}
	}

	delete[] backwards;
}
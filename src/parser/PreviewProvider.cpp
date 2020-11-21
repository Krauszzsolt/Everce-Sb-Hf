#include "PreviewProvider.h"
#include "CAFF.h"
#include <sstream>

unsigned char* PreviewProvider::getPreviewOfCaff(const char* str, unsigned long long len, unsigned long long size)
{
	CAFF caff;
	std::stringstream ss;

	for (int i = 0; i < 100; i++)
	{
		std::cout << (int)str[i] << "\n";
	}

	std::string s(str, len);

	ss.str(s);

	ss >> caff;

	return caff.getBitMapPreview(size);
}
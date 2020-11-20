#include "PreviewProvider.h"
#include "CAFF.h"

unsigned char* __declspec(dllexport) PreviewProvider::getPreviewOfCaff(std::istream& is, unsigned long long size)
{
	CAFF caff;

	is >> caff;

	return caff.getBitMapPreview(size);
}
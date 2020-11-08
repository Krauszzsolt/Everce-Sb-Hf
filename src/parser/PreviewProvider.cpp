#include "PreviewProvider.h"
#include "CAFF.h"

unsigned char* PreviewProvider::getPreviewOfCaff(std::istream& is, unsigned long long size)
{
	CAFF caff;

	is >> caff;

	return caff.getBitMapPreview(size);
}
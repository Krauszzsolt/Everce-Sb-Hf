#pragma once 
#include "IPreviewProvider.h"

class __declspec(dllexport) PreviewProvider : public IPreviewProvider
{
public:
	void getPreviewOfCaff(unsigned char* bitmap, const char* str, unsigned long long len, unsigned long long size) override;
};

#pragma once 
#include "IPreviewProvider.h"

class __declspec(dllexport) PreviewProvider : public IPreviewProvider
{
public:
	unsigned char* getPreviewOfCaff(const char* str, unsigned long long len, unsigned long long size) override;
};

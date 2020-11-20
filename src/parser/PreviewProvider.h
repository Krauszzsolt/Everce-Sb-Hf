#pragma once 
#include "IPreviewProvider.h"

class __declspec(dllexport) PreviewProvider : public IPreviewProvider
{
public:
	unsigned char* getPreviewOfCaff(std::istream& is, unsigned long long size) override;
};

#pragma once
#include <iostream>

class __declspec(dllexport) IPreviewProvider
{
public:
	virtual void getPreviewOfCaff(unsigned char* bitmap, const char* str, unsigned long long len, unsigned long long size) = 0;
};
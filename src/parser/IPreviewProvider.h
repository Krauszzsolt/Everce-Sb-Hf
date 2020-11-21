#pragma once
#include <iostream>

class __declspec(dllexport) IPreviewProvider
{
public:
	virtual unsigned char* getPreviewOfCaff(const char* str, unsigned long long len, unsigned long long size) = 0;
};
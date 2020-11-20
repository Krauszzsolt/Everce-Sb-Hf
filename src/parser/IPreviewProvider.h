#pragma once
#include <iostream>

class __declspec(dllexport) IPreviewProvider
{
public:
	virtual unsigned char* getPreviewOfCaff(std::istream& is, unsigned long long size) = 0;
};
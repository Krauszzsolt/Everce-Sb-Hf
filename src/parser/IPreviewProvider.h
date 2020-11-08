#pragma once
#include <iostream>

class IPreviewProvider
{
public:
	virtual unsigned char* getPreviewOfCaff(std::istream& is, unsigned long long size) = 0;
};
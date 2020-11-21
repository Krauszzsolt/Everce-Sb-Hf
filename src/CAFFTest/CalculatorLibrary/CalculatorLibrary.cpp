#include "pch.h"
#include "CalculatorLibrary.h"
#include <iostream>

unsigned long long add(unsigned long long a, unsigned long long b)
{
	return a + b;
}

int testFunc(std::istream& is, unsigned long long size)
{
	//unsigned char* buffer = new unsigned char[4];
	
	//std::cout << is.rdbuf();

    if (is) {

        // get length of file:
        is.seekg(0, is.end);
        int length = is.tellg();
        is.seekg(0, is.beg);

		return length;
        /*char* buffer = new char[1];

		is.read(buffer, 1);

		return buffer;*/

	}
	
	return -89;

	/*buffer[0] = 't';
	buffer[1] = 'x';
	buffer[2] = 'y';
	buffer[3] = 'z';*/
	
}

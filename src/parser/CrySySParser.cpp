// CrySySParser.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <fstream>

#include "PreviewProvider.h"


int main()
{
    std::ifstream f("1.caff", std::ifstream::binary);
    unsigned long long size = 300;

    PreviewProvider pp;

    unsigned char* preview = pp.getPreviewOfCaff(f, size);

    std::ofstream g("out.bmp");

    for (int i = 0; i < size * size * 4 + 54; i++)
    {
        g << preview[i];
    }

    return 0;
}
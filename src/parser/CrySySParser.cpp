// CrySySParser.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <fstream>

#include "PreviewProvider.h"


int main()
{
    std::ifstream f("2.caff", std::ifstream::binary);
    unsigned long long size = 1000;

    PreviewProvider pp;
    std::string s;

    while (!f.eof())
    {
        char c;
        f.read(&c, 1);
        s += c;
    }

    unsigned char* preview = pp.getPreviewOfCaff(s.c_str(), s.length(), size);

    std::ofstream g("out.bmp", std::ifstream::binary);

    for (int i = 0; i < size * size * 4 + 54; i++)
    {
        g << preview[i];
    }

    return 0;
}
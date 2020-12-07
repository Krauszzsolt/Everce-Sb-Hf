// CrySySParser.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <fstream>

#include "PreviewProvider.h"


int main()
{
    std::ifstream f("1.caff", std::ifstream::binary);
    unsigned long long size = 1000;

    PreviewProvider pp;
    std::string s;

    while (!f.eof())
    {
        char c;
        f.read(&c, 1);
        s += c;
    }

    unsigned char* preview = new unsigned char[size * size * 4 + 54];

    pp.getPreviewOfCaff(preview, s.c_str(), s.length(), size);

    f.close();

    std::ofstream g("out.bmp", std::ifstream::binary);

    for (int i = 0; i < size * size * 4 + 54; i++)
    {
        g << preview[i];
    }
    g.close();

    std::ifstream f2("2.caff", std::ifstream::binary);
    unsigned long long size2 = 1000;

    PreviewProvider pp2;
    std::string s2;

    while (!f2.eof())
    {
        char c;
        f2.read(&c, 1);
        s2 += c;
    }

    unsigned char* preview2 = new unsigned char[size2 * size2 * 4 + 54];

    pp2.getPreviewOfCaff(preview2, s2.c_str(), s2.length(), size2);

    std::ofstream g2("out2.bmp", std::ifstream::binary);

    for (int i = 0; i < size2 * size2 * 4 + 54; i++)
    {
        g2 << preview2[i];
    }
    g2.close();


    return 0;
}
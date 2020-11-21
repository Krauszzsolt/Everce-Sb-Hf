#pragma once
#include <istream>

#ifdef CAFFPARSERLIBRARY_EXPORTS
#define CAFFPARSERLIBRARY_API __declspec(dllexport)
#else
#define CAFFPARSERLIBRARY_API __declspec(dllimport)
#endif


extern "C" CAFFPARSERLIBRARY_API unsigned char* getPreviewOfCaff(std::istream& is, unsigned long long size);
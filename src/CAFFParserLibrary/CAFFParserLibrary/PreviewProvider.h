#pragma once
#include <istream>

#ifdef CAFFPARSERLIBRARY_EXPORTS
#define CAFFPARSERLIBRARY_API __declspec(dllexport)
#else
#define CAFFPARSERLIBRARY_API __declspec(dllimport)
#endif


extern "C" CAFFPARSERLIBRARY_API void getPreviewOfCaff(unsigned char* bitmap, const char* str, unsigned long long len, unsigned long long size);


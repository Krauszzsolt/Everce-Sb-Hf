#pragma once
#include <istream>

#ifdef CALCULATORLIBRARY_EXPORTS
#define CALCULATORLIBRARY_API __declspec(dllexport)
#else
#define CALCULATORLIBRARY_API __declspec(dllimport)
#endif

extern "C" CALCULATORLIBRARY_API unsigned long long add(unsigned long long a, unsigned long long b);

extern "C" CALCULATORLIBRARY_API int testFunc(std::istream & is, unsigned long long size);

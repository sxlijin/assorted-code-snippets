#include <iostream>
#include <cmath>

/**
 *
 * I do different things when compiled with GCC and Clang!
 *
 */

struct Scalar {
    int data;

    Scalar(int x) : data(x) {}

    int get() {
        return data;
    }

    Scalar &square() {
        scale(data);
        return *this;
    }

    void scale(const int &rhs) {
        data *= rhs;
    }
};

int main() {
    Scalar v(3);

    v.square().scale(v.get());

    return v.data;
}

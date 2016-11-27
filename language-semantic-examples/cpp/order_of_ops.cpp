/**
 *
 * I do different things when compiled with GCC and Clang! Details below:
 *
 * $ uname -a
 * Linux x220-arch-x64 4.8.10-1-ARCH #1 SMP PREEMPT Mon Nov 21 11:55:43 CET 2016 x86_64 GNU/Linux
 *
 * $ g++ --version
 * g++ (GCC) 6.2.1 20160830
 * Copyright (C) 2016 Free Software Foundation, Inc.
 * This is free software; see the source for copying conditions.  There is NO
 * warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * $ clang++ --version
 * clang version 3.9.0 (tags/RELEASE_390/final)
 * Target: x86_64-unknown-linux-gnu
 * Thread model: posix
 * InstalledDir: /usr/bin
 *
 * $ g++ order_of_ops.cpp -o a.out && ./a.out; echo $?
 * 27
 *
 * $ clang++ order_of_ops.cpp -o a.out && ./a.out; echo $?
 * 81
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

    void scale(int rhs) {
        data *= rhs;
    }
};

int main() {
    Scalar v(3);

    v.square().scale(v.get());

    return v.data;
}

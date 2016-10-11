#include <iostream>

using std::cout;
using std::endl;

template<typename T>
void print_and_delete(T *array, int n) {
    for (int i = 0; i < n; ++i) {
        cout << *(array + i) << endl;
    }
    delete []array;
}

int main() {
    int array[] = {0, 0, 0, 0, 0};
    print_and_delete(array, 5);
    return 0;
}

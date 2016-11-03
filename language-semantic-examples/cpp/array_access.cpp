int main() {
    int array[4];
    for (int &elem: array) elem = 0;
    return 0;
}

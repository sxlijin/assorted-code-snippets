#include <iostream>
#include <fstream>
#include <cstring>

struct FooParse {

    void printFile(std::string fname) {
        std::string s;
        std::ifstream ifs(fname);

        if (!ifs) return;

        while (getline(ifs, s)) {
            char *c = strdup(("_ " + s).c_str());
            std::strtok(c, " ");
            readAndPrintFile();
        }
    }

    void readAndPrintFile() {
        char *token;
        while (true) {
            token = std::strtok(nullptr, " {}");
            if (token == nullptr) break;
            std::cout << token << std::endl;;
        }
    }
};

int main() {
    FooParse().printFile("read_from_file_without_passing_stream.cpp");
    return 0;
}


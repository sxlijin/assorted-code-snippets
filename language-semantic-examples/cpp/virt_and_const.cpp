#include <iostream>

struct Animal {
    Animal(std::string s = "name") : name(s) {}

    virtual const std::string &get() const {
        return name;
    }

    std::string &get() {
        std::cout << "invoked non-const Animal.get" << std::endl;
        return const_cast<std::string&>(static_cast<const Animal*>(this)->get());
    }
    
    std::string name;
};

struct Dog : public Animal {
    Dog(std::string s = "name", std::string sound = "woof")
        : Animal(s), onomatopeia(sound) {}

    virtual const std::string &get() const {
        return onomatopeia;
    }

    std::string onomatopeia;
};

int main() {
    Animal *a = new Animal();
    Animal *b = new Dog();

    std::cout << a->get() << std::endl;
    std::cout << b->get() << std::endl;

    return 0;
}

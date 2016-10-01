// Samuel Lijin <sxlijin@gmail.com>
// Copyright (c) 2016

// Demonstrates that Java passes non-primitives via pass-value-by-reference

class PassingSemantics {

    String mAttr;

    // must be public because overrides a public
    public String toString() {
        return String.format("<%s, %s>", super.toString(), mAttr);
    }
    
    // must be public by Java spec
    public static void main(String[] args) {
        PassingSemantics foo = new PassingSemantics();
        foo.mAttr = "set by main()";

        System.out.printf("main(): %s\n", foo);

        func(foo);
        System.out.printf("main(): %s\n", foo);
    }

    static void func(PassingSemantics mPassingSemantics) {
        System.out.printf("func(): %s\n", mPassingSemantics);
        mPassingSemantics.mAttr = "set by func()";
        System.out.printf("func(): %s\n", mPassingSemantics);
    }

}

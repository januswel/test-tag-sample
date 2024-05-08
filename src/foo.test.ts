describe('test suite A', () => {
  it('test case A', () => {});
  it('[freaky] test case B', () => {});
});

describe('[freaky] test suite B', () => {
  it('test case C', () => {});
  it('[freaky] test case D', () => {});
});

describe('test suite C', () => {
  it('[freaky][long]test case E', () => {});
  it('[long][freaky] test case F', () => {});
});
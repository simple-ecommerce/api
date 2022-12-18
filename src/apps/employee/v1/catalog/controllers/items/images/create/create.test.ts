describe("employee#v1#catalog#items#images#create#POST", () => {
  describe("the user is authenticated", () => {
    describe("the item belongs to the user company", () => {
      it("should create the image", () => {});
    });
    describe("the item don't belongs to the user company", () => {
      it('should return a 404 "not found" error', () => {});
    });
  });
});

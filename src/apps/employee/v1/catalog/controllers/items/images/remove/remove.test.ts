describe("employee#v1#catalog#items#images#remove#DELETE", () => {
  describe("the user is authenticated", () => {
    describe("the item belongs to the user company", () => {
      describe("the image belongs to the item", () => {
        it("should remove the image", () => {});
      });
      describe("the image don't belongs to the item", () => {
        it('should return a 404 "not found" error', () => {});
      });
    });
    describe("the item don't belongs to the user company", () => {
      it('should return a 404 "not found" error', () => {});
    });
  });
});

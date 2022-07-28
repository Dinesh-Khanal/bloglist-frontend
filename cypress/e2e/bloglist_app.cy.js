describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Dinesh Khanal",
      username: "dinesh",
      password: "pass123",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login to application");
    cy.contains("login");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("dinesh");
      cy.get("#password").type("pass123");
      cy.get("#btn-login").click();
      cy.contains("Dinesh Khanal logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("dinesh");
      cy.get("#password").type("abcd");
      cy.get("#btn-login").click();
      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "dinesh", password: "pass123" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Sample blog for testing");
      cy.get("#author").type("Dinesh Khanal");
      cy.get("#url").type("http://testing.blog.com");
      cy.contains("Create").click();
      cy.contains("Sample blog for testing");
      cy.contains("Dinesh Khanal");
    });
    describe("When blog is created", function () {
      beforeEach(function () {
        cy.CreateBlog({
          title: "Sample blog for testing",
          author: "Dinesh Khanal",
          url: "http://testing.blog.com",
        });
        cy.contains("view").click();
      });
      it("User can like a blog", function () {
        cy.contains("like").click();
        cy.contains("Likes 1");
      });
      it("User who created blog can delete", function () {
        cy.contains("remove").click();
        cy.contains("create new blog");
        cy.get("html").should("not.contain", "view");
      });
    });
  });
});

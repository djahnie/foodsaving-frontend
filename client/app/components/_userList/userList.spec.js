import UserListModule from "./userList";

describe("UserList", () => {
  let $componentController, $httpBackend;

  let { module } = angular.mock;

  beforeEach(module(UserListModule));

  let $log;
  beforeEach(inject(($injector) => {
    $log = $injector.get("$log");
    $log.reset();
  }));
  afterEach(() => {
    $log.assertEmpty();
  });

  beforeEach(inject(($injector) => {
    $httpBackend = $injector.get("$httpBackend");
    $componentController = $injector.get("$componentController");
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  let userOne = {
    "id": 1,
    "name": "Testuser1",
    "description": "all the good stuff",
    "group": 1,
    "address": null,
    "latitude": null,
    "longitude": null
  };

  describe("Controller", () => {
    let controller;

    it("check binding of complete users",() => {
      controller = $componentController("userList", {
      }, {
        users: [userOne]
      });

      expect(controller.userData).to.deep.equal([userOne]);
    });


    it("maps users-array",() => {
      controller = $componentController("userList", {
      }, {
        users: [1]
      });

      $httpBackend.expectGET("/api/users/1/").respond(userOne);
      $httpBackend.flush();
    });
  });
});

const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://f.hr.dmerej.info/");

  // Add employee

  await page.getByRole("link", { name: "Add new employee" }).click();
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("John");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("john@mail.com");
  await page.getByPlaceholder("Hiring date").fill("2020-11-01");
  await page.getByPlaceholder("Job title").click();
  await page.getByPlaceholder("Job title").fill("CEO");
  await page.locator("#id_address_line1").fill("11 Random street");
  await page.getByPlaceholder("City").fill("Paris");
  await page.getByPlaceholder("Zip code").fill("75001");
  await page.getByRole("button", { name: "Add" }).click();

  // Duplicate employee

  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "Add new employee" }).click();
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("John");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("john@mail.com");
  await page.locator("#id_address_line1").click();
  await page.locator("#id_address_line1").fill("11 Random street");
  await page.getByPlaceholder("City").click();
  await page.getByPlaceholder("City").fill("Paris");
  await page.getByPlaceholder("Zip code").click();
  await page.getByPlaceholder("Zip code").fill("75001");
  await page.getByPlaceholder("Hiring date").fill("2020-11-01");
  await page.getByPlaceholder("Job title").click();
  await page.getByPlaceholder("Job title").fill("CEO");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole('link', { name: 'List Employees' }).click();
  await page.locator("tr:last-child > td:nth-child(5) > .btn").click();
  await page.getByRole('button', { name: 'Proceed' }).click();


  // ZIP erroné

  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "Add new employee" }).click();
  await page.getByRole("group", { name: "Basic Info" }).click();
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("John");
  await page.locator("div").filter({ hasText: "Email" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("john@mail.com");
  await page.locator("#id_address_line1").click();
  await page.locator("#id_address_line1").fill("11 Random street");
  await page.getByPlaceholder("City").click();
  await page.getByPlaceholder("City").fill("1203493");
  await page.getByPlaceholder("Zip code").click();
  await page.getByPlaceholder("City").click({
    clickCount: 3,
  });
  await page.getByPlaceholder("City").fill("Paris");
  await page.getByPlaceholder("Zip code").click();
  await page.getByPlaceholder("Zip code").fill("122345");
  await page.getByPlaceholder("Hiring date").fill("2000-01-01");
  await page.getByPlaceholder("Job title").click();
  await page.getByPlaceholder("Job title").fill("CEO");
  await page.getByRole("button", { name: "Add" }).click();

  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole('link', { name: 'List Employees' }).click();
  await page.locator("tr:last-child > td:nth-child(5) > .btn").click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  
  // Update address (KO)

  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "List Employees" }).click();
  await page.locator("tr:nth-child(1) > td:nth-child(4) > .btn").click();
  await page.getByRole("link", { name: "Update address" }).click();
  await page.locator("#id_address_line1").click();
  await page.locator("#id_address_line1").fill("11 New random street");
  await page.getByRole("button", { name: "Update" }).click();
  await page.getByRole("link", { name: "Update address" }).click();

  // Create Team

  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "Create new team" }).click();
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("The winners");
  await page.getByRole("button", { name: "Add" }).click();

  // Create Team without name

  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "Create new team" }).click();
  await page.getByRole("button", { name: "Add" }).click();

  // Create team with only special caracters

  //Create Team with spaces instead of name

  await page.getByPlaceholder("Name").fill("   ");
  await page.getByRole("button", { name: "Add" }).click();

  // Adding employees to team
  await page.goto("https://f.hr.dmerej.info/");
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Create new team' }).click();
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('Team');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole("link", { name: "List Employees" }).click();
  await page.locator("tr:nth-child(1) > td:nth-child(4) > .btn").click();
  await page.getByRole("link", { name: "Add to team" }).click();

  await page.getByRole("combobox", { name: "Team" }).selectOption("Team team");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "List teams" }).click();
  await page
    .getByRole("row", { name: "The winners View members Delete" })
    .getByRole("link", { name: "View members" })
    .click();

  // Unassign Team from emloyee

  // Delete Team containing employees
  await page.getByRole("link", { name: "Home" }).click();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Add new employee" })
    .click();
  await page.getByRole("link", { name: "Add new employee" }).click();
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("Test");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("test@test.com");
  await page.locator("#id_address_line1").click();
  await page.locator("#id_address_line1").fill("11 random street");
  await page.getByRole("group", { name: "Address" }).click();
  await page.getByPlaceholder("City").click();
  await page.getByPlaceholder("City").fill("Paris");
  await page.getByPlaceholder("Zip code").click();
  await page.getByPlaceholder("Zip code").fill("0000");
  await page.getByPlaceholder("Hiring date").fill("2000-11-11");
  await page.getByPlaceholder("Job title").click();
  await page.getByPlaceholder("Job title").fill("CEO");
  await page.getByRole("button", { name: "Add" }).click();
  await page
    .getByRole("row", { name: "Test test@test.com no Edit Delete" })
    .getByRole("link", { name: "Edit" })
    .click();
  await page.getByRole("link", { name: "Add to team" }).click();
  await page.getByRole("combobox", { name: "Team" }).selectOption("Team team");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "List teams" }).click();
  await page
    .getByRole("row", { name: "Team View members Delete" })
    .getByRole("link", { name: "Delete" })
    .click();
  await page.getByRole("button", { name: "Proceed" }).click();

  await page.goto("https://f.hr.dmerej.info/");
  await page.getByRole('link', { name: 'List Employees' }).click();
  await page.locator("tr:last-child > td:nth-child(5) > .btn").click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  //Add employe -------
  await page.goto("https://f.hr.dmerej.info/");

  await page.getByRole("link", { name: "Add new employee" }).click();
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("Paul Test");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("paul@test.com");
  await page.getByPlaceholder("Hiring date").fill("2020-11-01");
  await page.getByPlaceholder("Job title").click();
  await page.getByPlaceholder("Job title").fill("Test soft");
  await page.locator("#id_address_line1").fill("21 Random street");
  await page.getByPlaceholder("City").fill("Paris");
  await page.getByPlaceholder("Zip code").fill("75001");
  await page.getByRole("button", { name: "Add" }).click();
  //-------------------

  // Promote employee to manager
  await page.getByRole("row", { name: "Paul Test paul@test.com no Edit Delete" })
            .getByRole("link", { name: "Edit" })
            .click();
  await page.getByRole("link", { name: "Promote as manager"}).click();
  await page.getByRole("button", { name: "Proceed"}).click();
  //should be => Paul Test paul@test.com yes Edit Delete

  // Demote manager to employee
  await page.getByRole("row", { name: "Paul Test paul@test.com yes Edit Delete" })
            .getByRole("link", { name: "Edit" })
            .click();
  await page.getByRole("link", { name: "Promote as manager"}).click();
  await page.getByRole("button", { name: "Proceed"}).click();
  //should be => Paul Test paul@test.com no Edit Delete



  // Delete employee
  await page.getByRole("row", { name: "Paul Test paul@test.com yes Edit Delete" })
            .getByRole("link", { name: "Delete" })
            .click();
  await page.getByRole("button", { name: "Proceed"}).click();
  // ---------------------
  await context.close();
  await browser.close();
})();

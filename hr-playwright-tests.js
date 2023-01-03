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

  // Update address (KO)

  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "List Employees" }).click();
  await page.locator("tr:nth-child(105) > td:nth-child(4) > .btn").click();
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

  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "List Employees" }).click();
  await page.locator("tr:nth-child(105) > td:nth-child(4) > .btn").click();
  await page.getByRole("link", { name: "Add to team" }).click();
  await page.getByRole("combobox", { name: "Team" }).selectOption("14");
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
  await page.getByRole("combobox", { name: "Team" }).selectOption("15");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link", { name: "List teams" }).click();
  await page
    .getByRole("row", { name: "Test delete View members Delete" })
    .getByRole("link", { name: "Delete" })
    .click();
  await page.getByRole("button", { name: "Proceed" }).click();

  //Promote employee to manager
  // Demote manager to employee

  // Delete employee

  // ---------------------
  await context.close();
  await browser.close();
})();

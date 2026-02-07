/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://sellog.com",
  generateRobotsTxt: true,
  exclude: ["/www"],
};

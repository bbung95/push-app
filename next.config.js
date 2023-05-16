const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "i.ibb.co", "*"],
    },
    reactStrictMode: false,
    env: {
        RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: "false",
    },
};

module.exports = withPWA({
    pwa: {
        dest: "public",
    },
});

module.exports = nextConfig;

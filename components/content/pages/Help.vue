<script setup>
import { ref } from "vue";

import Header from "./../partials/Header.vue";
import PageIllustration from "./../partials/PageIllustration.vue";
import Footer from "./../partials/Footer.vue";

const page = ref(1);
</script>

<template>
  <div
    class="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip"
  >
    <!-- Page content -->
    <main class="relative grow">
      <!-- Page illustration -->
      <PageIllustration multiple />

      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="py-12 md:py-20">
          <div class="flex flex-col justify-between md:flex-row">
            <!-- Main content -->
            <section class="order-1 md:flex-auto lg:pl-10">
              <!-- FAQ’s – Frequently Asked Questions -->
              <article v-show="page === 1">
                <div class="mb-8">
                  <h1
                    class="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 text-3xl font-semibold text-transparent md:text-4xl"
                  >
                    FAQ's - General Topics
                  </h1>
                </div>
                <ul class="space-y-8 p-0 list-none">
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      How can I use Open PRO without registration?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Can I import my sitemap to Open PRO?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      How can I switch my subscription between essential, and
                      premium plans?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Can I cancel my subscription at any time?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Is there an additional discount when paid annually?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      What happens if I don’t renew my license after one year?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      What kind of payment methods do you provide?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                </ul>
              </article>

              <!-- What is Open PRO -->
              <article v-show="page === 2">
                <div class="mb-8">
                  <h1
                    class="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 text-3xl font-semibold text-transparent md:text-4xl"
                  >
                    What is Open PRO
                  </h1>
                </div>
                <ul class="space-y-8 p-0 list-none">
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      How can I use Open PRO without registration?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Can I import my sitemap to Open PRO?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      How can I switch my subscription between essential, and
                      premium plans?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Can I cancel my subscription at any time?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Is there an additional discount when paid annually?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      What happens if I don’t renew my license after one year?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      What kind of payment methods do you provide?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                </ul>
              </article>

              <!-- Open PRO plan’s features -->
              <article v-show="page === 3">
                <div class="mb-8">
                  <h1
                    class="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 text-3xl font-semibold text-transparent md:text-4xl"
                  >
                    Open PRO plan’s features
                  </h1>
                </div>
                <ul class="space-y-8 p-0 list-none">
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      How can I use Open PRO without registration?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Can I import my sitemap to Open PRO?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      How can I switch my subscription between essential, and
                      premium plans?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Can I cancel my subscription at any time?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Is there an additional discount when paid annually?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      What happens if I don’t renew my license after one year?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      What kind of payment methods do you provide?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                </ul>
              </article>

              <!-- Get started -->
              <article v-show="page === 4">
                <div class="mb-8">
                  <h1
                    class="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 text-3xl font-semibold text-transparent md:text-4xl"
                  >
                    Get started
                  </h1>
                </div>
                <ul class="space-y-8 p-0 list-none">
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      How can I use Open PRO without registration?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Can I import my sitemap to Open PRO?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      How can I switch my subscription between essential, and
                      premium plans?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Can I cancel my subscription at any time?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Is there an additional discount when paid annually?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      What happens if I don’t renew my license after one year?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      What kind of payment methods do you provide?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                </ul>
              </article>

              <!-- Payments FAQ’s -->
              <article v-show="page === 5">
                <div class="mb-8">
                  <h1
                    class="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 text-3xl font-semibold text-transparent md:text-4xl"
                  >
                    Payments FAQ’s
                  </h1>
                </div>
                <ul class="space-y-8 p-0 list-none">
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      How can I use Open PRO without registration?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Can I import my sitemap to Open PRO?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      How can I switch my subscription between essential, and
                      premium plans?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Can I cancel my subscription at any time?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      Is there an additional discount when paid annually?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      What happens if I don’t renew my license after one year?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                  <li>
                    <h2
                      class="font-nacelle mb-2 text-lg font-semibold text-gray-200"
                    >
                      What kind of payment methods do you provide?
                    </h2>
                    <p class="text-indigo-200/65">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis enim lobortis scelerisque fermentum.
                    </p>
                  </li>
                </ul>
              </article>
            </section>

            <!-- Nav sidebar -->
            <aside class="mb-16 md:mb-0 md:mr-10 md:w-60 md:shrink-0">
              <nav
                class="relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 px-5 py-3 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              >
                <ul class="divide-y p-0 text-sm list-none">
                  <li
                    class="py-2 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1]"
                  >
                    <a
                      class="group flex items-center transition"
                      :class="
                        page === 1
                          ? 'text-indigo-500'
                          : 'text-indigo-200/65 hover:text-indigo-500'
                      "
                      href="#0"
                      @click.prevent="page = 1"
                    >
                      <span>FAQ's - General Topics</span>
                      <svg
                        class="ml-2 h-3 w-3 shrink-0 transform fill-current opacity-0 transition group-hover:translate-x-1 group-hover:text-indigo-600 group-hover:opacity-100"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        />
                      </svg>
                    </a>
                  </li>
                  <li
                    class="py-2 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1]"
                  >
                    <a
                      :class="
                        page === 2
                          ? 'text-indigo-500'
                          : 'text-indigo-200/65 hover:text-indigo-500'
                      "
                      class="group flex items-center transition"
                      href="#0"
                      @click.prevent="page = 2"
                    >
                      <span>What is Open PRO</span>
                      <svg
                        class="ml-2 h-3 w-3 shrink-0 transform fill-current opacity-0 transition group-hover:translate-x-1 group-hover:text-indigo-600 group-hover:opacity-100"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        />
                      </svg>
                    </a>
                  </li>
                  <li
                    class="py-2 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1]"
                  >
                    <a
                      :class="
                        page === 3
                          ? 'text-indigo-500'
                          : 'text-indigo-200/65 hover:text-indigo-500'
                      "
                      class="group flex items-center transition"
                      href="#0"
                      @click.prevent="page = 3"
                    >
                      <span>Open PRO plan’s features</span>
                      <svg
                        class="ml-2 h-3 w-3 shrink-0 transform fill-current opacity-0 transition group-hover:translate-x-1 group-hover:text-indigo-600 group-hover:opacity-100"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        />
                      </svg>
                    </a>
                  </li>
                  <li
                    class="py-2 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1]"
                  >
                    <a
                      :class="
                        page === 4
                          ? 'text-indigo-500'
                          : 'text-indigo-200/65 hover:text-indigo-500'
                      "
                      class="group flex items-center transition"
                      href="#0"
                      @click.prevent="page = 4"
                    >
                      <span>Get started</span>
                      <svg
                        class="ml-2 h-3 w-3 shrink-0 transform fill-current opacity-0 transition group-hover:translate-x-1 group-hover:text-indigo-600 group-hover:opacity-100"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        />
                      </svg>
                    </a>
                  </li>
                  <li
                    class="py-2 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1]"
                  >
                    <a
                      :class="
                        page === 5
                          ? 'text-indigo-500'
                          : 'text-indigo-200/65 hover:text-indigo-500'
                      "
                      class="group flex items-center transition"
                      href="#0"
                      @click.prevent="page = 5"
                    >
                      <span>Payments FAQ’s</span>
                      <svg
                        class="ml-2 h-3 w-3 shrink-0 transform fill-current opacity-0 transition group-hover:translate-x-1 group-hover:text-indigo-600 group-hover:opacity-100"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

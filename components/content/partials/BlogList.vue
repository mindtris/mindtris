<script setup>
import { ref } from "vue";

const category = ref(1);
</script>

<template>
  <section>
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <!-- Hero content -->
      <div class="py-12 md:py-20">
        <!-- Section header -->
        <div class="pb-12 text-center">
          <h1
            class="m-0 font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 text-4xl font-semibold text-transparent md:text-5xl"
          >
            The Open PRO Blog
          </h1>
          <div class="mx-auto max-w-3xl">
            <p class="text-xl text-indigo-200/65 m-0">
              Discover the latest news, tips and user research insights from
              Open PRO.
            </p>
          </div>
        </div>

        <div>
          <!-- Buttons -->
          <div class="flex justify-center pb-12 max-md:hidden md:pb-20">
            <div
              class="relative inline-flex flex-wrap justify-center rounded-[1.25rem] bg-gray-800/40 p-1"
            >
              <!-- Button #1 -->
              <button
                class="flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200"
                :class="
                  category === 1
                    ? 'relative bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'
                    : 'opacity-65 transition-opacity hover:opacity-90'
                "
                :aria-pressed="category === 1"
                @click="category = 1"
              >
                <svg
                  class="fill-current"
                  :class="category === 1 ? 'text-indigo-500' : 'text-gray-600'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                >
                  <path
                    d="M7 3a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1ZM0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1Zm1 4a1 1 0 1 0 0 2h7a1 1 0 1 0 0-2H1Z"
                  />
                </svg>
                <span>View All</span>
              </button>
              <!-- Button #2 -->
              <button
                class="flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200"
                :class="
                  category === 2
                    ? 'relative bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'
                    : 'opacity-65 transition-opacity hover:opacity-90'
                "
                :aria-pressed="category === 2"
                @click="category = 2"
              >
                <svg
                  class="fill-current"
                  :class="category === 2 ? 'text-indigo-500' : 'text-gray-600'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                >
                  <path
                    d="M1 2a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H9v11a1 1 0 1 1-2 0V3H2a1 1 0 0 1-1-1Zm1.762 5.212.96.36a.429.429 0 0 1 0 .802l-.96.36-.36.96a.428.428 0 0 1-.803 0l-.36-.96-.961-.36a.429.429 0 0 1 0-.802l.96-.36.36-.96c.126-.336.678-.336.803 0l.36.96Zm12.89 3.753-1.2-.45-.45-1.201c-.157-.419-.847-.419-1.004 0l-.45 1.2-1.2.45a.536.536 0 0 0 0 1.004l1.2.45.45 1.2a.535.535 0 0 0 1.004 0l.45-1.2 1.2-.45a.536.536 0 0 0 0-1.003ZM5 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                  />
                </svg>
                <span>AI Content</span>
              </button>
              <!-- Button #3 -->
              <button
                class="flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200"
                :class="
                  category === 3
                    ? 'relative bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'
                    : 'opacity-65 transition-opacity hover:opacity-90'
                "
                :aria-pressed="category === 3"
                @click="category = 3"
              >
                <svg
                  class="fill-current"
                  :class="category === 3 ? 'text-indigo-500' : 'text-gray-600'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                >
                  <path
                    d="M1 8.914S5.225 4.55 7.629 2.659c1.607-1.264 2.554-1.388 3.137-.807 1.063 1.06-.422 3.026-2.446 5.716-2.023 2.69-3.487 4.234-2.379 5.28 1.095 1.033 3.357-1.278 4.2-2.22.844-.941 2.768-3.03 3.71-2.151.836.778-.404 2.657-.842 3.497-.439.84-.978 1.707-.337 2.286.906.82 2.328-.908 2.328-.908"
                  />
                </svg>
                <span>Automation</span>
              </button>
              <!-- Button #4 -->
              <button
                class="flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200"
                :class="
                  category === 4
                    ? 'relative bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'
                    : 'opacity-65 transition-opacity hover:opacity-90'
                "
                :aria-pressed="category === 4"
                @click="category = 4"
              >
                <svg
                  class="fill-current"
                  :class="category === 4 ? 'text-indigo-500' : 'text-gray-600'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                >
                  <path
                    d="M8 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3 1a3.001 3.001 0 0 1-2 2.83v8.087a6.008 6.008 0 0 0 4.742-4.17l-.295.147a1 1 0 1 1-.894-1.788l2-1A1 1 0 0 1 16 8 8 8 0 1 1 0 8a1 1 0 0 1 1.447-.894l2 1a1 1 0 0 1-.894 1.788l-.295-.147A6.008 6.008 0 0 0 7 13.917V5.829A3.001 3.001 0 1 1 11 3Z"
                  />
                </svg>
                <span>Customer Service</span>
              </button>
              <!-- Button #5 -->
              <button
                class="flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200"
                :class="
                  category === 5
                    ? 'relative bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'
                    : 'opacity-65 transition-opacity hover:opacity-90'
                "
                :aria-pressed="category === 5"
                @click="category = 5"
              >
                <svg
                  class="fill-current"
                  :class="category === 5 ? 'text-indigo-500' : 'text-gray-600'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                >
                  <path
                    d="M10.207.293a1 1 0 0 1 0 1.414L8.414 3.5l1.793 1.793a1 1 0 0 1-1.414 1.414l-2.5-2.5a1 1 0 0 1 0-1.414l2.5-2.5a1 1 0 0 1 1.414 0ZM0 4a4 4 0 0 1 4-4h.55a1 1 0 0 1 .707 1.707l-.024.025a1 1 0 0 1-.93.268H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8.45a1 1 0 1 1 2 0V12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4ZM13.207.293a1 1 0 1 0-1.414 1.414L13.586 3.5l-1.793 1.793a1 1 0 0 0 1.414 1.414l2.5-2.5a1 1 0 0 0 0-1.414l-2.5-2.5Z"
                  />
                </svg>
                <span>Engineering</span>
              </button>
            </div>
          </div>

          <!-- Articles -->
          <div
            class="mx-auto grid max-w-sm items-start gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3"
          >
            <!-- Article #1 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 2].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 2].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-01.jpg"
                    width="347"
                    height="220"
                    alt="Article 01"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="border-none btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >AI Content</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >The ultimate guide to AI management in the age of new
                    tools</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-01.jpg"
                  width="28"
                  height="28"
                  alt="Author 01"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Mark Zuch</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Content Manager</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #2 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 3].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 3].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-02.jpg"
                    width="347"
                    height="220"
                    alt="Article 02"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >Automation</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >New AI releases for better, faster, more personalized
                    support</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-02.jpg"
                  width="28"
                  height="28"
                  alt="Author 02"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Zara Burke</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Principal Editor</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #3 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 4].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 4].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-03.jpg"
                    width="347"
                    height="220"
                    alt="Article 03"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >Customer Service</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >Unlocking customer strategic potential with AI</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-03.jpg"
                  width="28"
                  height="28"
                  alt="Author 03"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Liam Geramy</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Managing Editor</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #4 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 5].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 5].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-04.jpg"
                    width="347"
                    height="220"
                    alt="Article 04"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none m-0 p-0 ">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >Engineering</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >How to lead your content service team into the AI
                    future</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-04.jpg"
                  width="28"
                  height="28"
                  alt="Author 04"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Bethany Clark</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Product Manager</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #5 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 3].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 3].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-05.jpg"
                    width="347"
                    height="220"
                    alt="Article 05"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >Automation</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >Making the jump from B2C to B2B content
                    management</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-05.jpg"
                  width="28"
                  height="28"
                  alt="Author 05"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Ruth O'Brien</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Senior Director</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #6 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 5].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 5].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-06.jpg"
                    width="347"
                    height="220"
                    alt="Article 06"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >Engineering</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >Prepare your internal knowledge content for AI</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-01.jpg"
                  width="28"
                  height="28"
                  alt="Author 01"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Mark Zuch</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Content Manager</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #7 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 2].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 2].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-07.jpg"
                    width="347"
                    height="220"
                    alt="Article 07"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >AI Content</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >B2B vs B2C product management: How different are they
                    really?</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-01.jpg"
                  width="28"
                  height="28"
                  alt="Author 01"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Mark Zuch</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Content Manager</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #8 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 4].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 4].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-08.jpg"
                    width="347"
                    height="220"
                    alt="Article 08"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >Customer Service</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >The new era of AI-first Content Service has
                    arrived</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-04.jpg"
                  width="28"
                  height="28"
                  alt="Author 04"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Bethany Clark</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Product Manager</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #9 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 4].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 4].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-09.jpg"
                    width="347"
                    height="220"
                    alt="Article 09"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >Customer Service</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >Fueling the content machine with the knowledge it
                    needs</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-03.jpg"
                  width="28"
                  height="28"
                  alt="Author 03"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Liam Geramy</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Managing Editor</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #10 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 5].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 5].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-10.jpg"
                    width="347"
                    height="220"
                    alt="Article 10"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >Engineering</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >Your first 90 days using content for customer
                    service</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-04.jpg"
                  width="28"
                  height="28"
                  alt="Author 04"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Bethany Clark</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Product Manager</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #11 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 3].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 3].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-11.jpg"
                    width="347"
                    height="220"
                    alt="Article 11"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >Automation</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >Open PRO’s new and improved reporting features</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-05.jpg"
                  width="28"
                  height="28"
                  alt="Author 05"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Ruth O'Brien</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Senior Director</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #12 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 2].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 2].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-12.jpg"
                    width="347"
                    height="220"
                    alt="Article 12"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >AI Content</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >Understanding the changing economics of content
                    management</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-05.jpg"
                  width="28"
                  height="28"
                  alt="Author 05"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Ruth O'Brien</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Senior Director</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #13 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 5].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 5].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-13.jpg"
                    width="347"
                    height="220"
                    alt="Article 13"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >Engineering</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >Five key takeaways about product management for
                    startups</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-04.jpg"
                  width="28"
                  height="28"
                  alt="Author 04"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Bethany Clark</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Product Manager</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #14 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 4].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 4].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-14.jpg"
                    width="347"
                    height="220"
                    alt="Article 14"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >Customer Service</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >Define your startup content strategy for maximum
                    Impact</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-02.jpg"
                  width="28"
                  height="28"
                  alt="Author 02"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Zara Burke</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Principal Editor</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #15 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 4].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 4].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/blog-post"
                  tabindex="-1"
                >
                  <img
                    class="aspect-[101/64] w-full object-cover opacity-70 grayscale transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../../../images/post-thumb-15.jpg"
                    width="347"
                    height="220"
                    alt="Article 15"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2 list-none p-0 m-0">
                    <li class="m-0 p-0">
                      <a
                        class="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60"
                        href="#0"
                      >
                        <span
                          class="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent"
                          >Customer Service</span
                        >
                      </a>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class="text-gray-200 transition hover:text-white"
                    to="/blog-post"
                    >How to design standout products in the modern
                    world</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <img
                  class="inline-flex shrink-0 rounded-full"
                  src="../../../images/post-author-04.jpg"
                  width="28"
                  height="28"
                  alt="Author 04"
                />
                <div class="text-sm font-medium text-gray-200">
                  <span>Bethany Clark</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-200/65 transition-colors hover:text-indigo-500"
                    href="#0"
                    >Product Manager</a
                  >
                </div>
              </footer>
            </article>
          </div>

          <!-- Pagination -->
          <nav class="mx-auto mt-16 flex max-w-xs items-center justify-between">
            <div>
              <a
                class="btn-sm group relative bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] [&[inert]]:opacity-30"
                href="#0"
                inert
              >
                <span
                  class="mr-1 tracking-normal text-white/50 transition-transform group-hover:-translate-x-0.5"
                  >&lt;-</span
                >
                Back
                <span class="sr-only">to previous articles</span>
              </a>
            </div>
            <div class="text-sm text-gray-600">
              <span class="text-gray-200">1</span> of
              <span class="text-indigo-200/65">4</span>
            </div>
            <div>
              <a
                class="btn-sm group relative bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] [&[inert]]:opacity-30"
                href="#0"
              >
                Next
                <span class="sr-only">articles</span>
                <span
                  class="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5"
                  >-&gt;</span
                >
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

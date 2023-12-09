<script>
  import { onMount, onDestroy } from "svelte";
  // Supports weights 300-900
  import "@fontsource-variable/red-hat-display";
  let conversionRate = 10;
  let conversionAmount = 30;
  let conversionValue = 1000;
  let conversionBoost = 2;
  $: currRev = Math.round(Number(conversionAmount) * Number(conversionValue));
  $: additionalRevenuePerMonth = Math.round(
    ((Number(conversionBoost) + Number(conversionRate)) /
      Number(conversionRate) -
      1) *
      currRev,
  );
  $: additionalRevenuePerYear = Math.round(additionalRevenuePerMonth * 12);
  $: totalMonth1ROI = (additionalRevenuePerMonth / 200) * 100;
  $: totalMonth12ROI = (additionalRevenuePerYear / 200) * 100;
  $: additionalConv = Math.round(
    ((Number(conversionBoost) + Number(conversionRate)) /
      Number(conversionRate) -
      1) *
      Number(conversionAmount),
  );
  $: totalConv = Number(conversionAmount) + Number(additionalConv);

  let containerWidth = 0;
  let containerHeight = 0;
  let container;

  // Function to update dimensions
  function updateDimensions() {
    const appContainer = document.getElementById("app-container");
    if (appContainer) {
      containerWidth = appContainer.clientWidth;
      containerHeight = appContainer.clientHeight;
      console.log(containerWidth);
      console.log(containerHeight);

      // Send the dimensions to the parent page
      window.parent.postMessage(
        { width: containerWidth, height: containerHeight },
        "*",
      );
    }
  }

  // Call the updateDimensions function initially
  onMount(updateDimensions);

  // Add event listener to recalculate dimensions on window resize
  window.addEventListener("resize", updateDimensions);

  // Remove event listener when component unmounts
  onDestroy(() => {
    window.removeEventListener("resize", updateDimensions);
  });
</script>

<div
  id="app-container"
  class="mx-auto box-border flex w-full max-w-6xl flex-col p-4 font-sans text-black md:flex-row"
  bind:this={container}
  on:resize={updateDimensions}
>
  <div
    id="Section-1"
    class="font-display mx-3 w-full self-center px-3 text-base md:mx-0 md:my-5 md:px-0"
  >
    <div
      id="card-padding"
      class="box-border rounded-tl-2xl rounded-tr-2xl border border-slate-300 bg-white p-3 text-black antialiased shadow-lg sm:p-5 md:rounded-bl-2xl md:rounded-tr-none"
    >
      <div id="form-div" class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label
            for="current-conversion-rate"
            class="box-border block font-semibold text-gray-700 antialiased"
            >Current conversion rate on your most important page:</label
          >
          <div class="mb-1 font-normal text-gray-500">
            e.g. appointment booking page
          </div>
          <div
            class="box-border flex rounded border bg-white p-2 text-black antialiased focus-within:border-blue-500 {conversionRate
              ? 'border-gray-300'
              : 'border-red-400'}"
          >
            <input
              id="current-conversion-rate"
              type="number"
              bind:value={conversionRate}
              class="box-border w-full border-white bg-white antialiased outline-none outline-0 focus:outline-none focus:outline-0"
              step="0.1"
              required
            />
            <span>%</span>
          </div>
        </div>
        <div class="flex flex-col">
          <label
            for="current-conversion-amount"
            class="mb-1 box-border block font-semibold text-gray-700 antialiased"
            >Current amount of conversions per month:</label
          >
          <div
            class="box-border flex rounded border bg-white p-2 text-black antialiased focus-within:border-blue-500 {conversionAmount
              ? 'border-gray-300'
              : 'border-red-400'}"
          >
            <input
              id="current-conversion-amount"
              type="number"
              bind:value={conversionAmount}
              class="box-border w-full border-white bg-white antialiased outline-none outline-0 focus:outline-none focus:outline-0"
              required
            />
          </div>
        </div>
        <div class="flex flex-col">
          <label
            for="current-conversion-value"
            class="box-border block font-semibold text-gray-700 antialiased"
            >Conversion value:</label
          >
          <div class="mb-1 font-normal text-gray-500">
            e.g. 1 call booked and 20% close rate with $5k offer = $1k
          </div>
          <div
            class="box-border flex rounded border bg-white p-2 text-black antialiased focus-within:border-blue-500 {conversionValue
              ? 'border-gray-300'
              : 'border-red-400'}"
          >
            <span>$</span>
            <input
              id="current-conversion-value"
              type="number"
              bind:value={conversionValue}
              class="box-border w-full border-white bg-white antialiased outline-none outline-0 focus:outline-none focus:outline-0"
              required
            />
          </div>
        </div>
        <div class="flex flex-col">
          <div class="mb-3 flex items-center justify-between gap-3">
            <label
              for="conversion-rate-boost"
              class="box-border block font-semibold text-gray-700 antialiased"
              >Boost in conversion rate after adding calculator:</label
            >
            <div class="min-w-[39px] text-right text-lg font-medium">
              {conversionBoost + "%"}
            </div>
          </div>
          <input
            class="h-[30px] appearance-none overflow-hidden rounded-[15px] bg-gray-300 text-gray-800"
            type="range"
            bind:value={conversionBoost}
            min="0"
            max="10"
            step="0.1"
          />
          <div
            class="ml-[13px] mr-[13px] mt-1 flex justify-between text-gray-500"
          >
            <div class=" w-[4px]">|</div>
            <div class="w-[4px]">|</div>
            <div class="w-[4px]">|</div>
            <div class="w-[4px]">|</div>
            <div class="w-[4px]">|</div>
            <div class="w-[4px]">|</div>
            <div class="w-[4px]">|</div>
            <div class="w-[4px]">|</div>
            <div class="w-[4px]">|</div>
            <div class="w-[4px]">|</div>
            <div class=" w-[4px]">|</div>
          </div>

          <div class="mt-1 flex justify-between text-gray-500">
            <div class="ml-[0.3em]">0%</div>
            <div>2%</div>
            <div>4%</div>
            <div>6%</div>
            <div>8%</div>
            <div class="">10%</div>
          </div>
          <!-- <div
            class="box-border flex rounded border bg-white p-2 text-black antialiased focus-within:border-blue-500 {conversionBoost
              ? 'border-gray-300'
              : 'border-red-400'}"
          >
            <input
              id="conversion-rate-boost"
              type="number"
              bind:value={conversionBoost}
              class="box-border w-full border-white bg-white antialiased outline-none outline-0 focus:outline-none focus:outline-0"
              step="0.1"
              required
            />
            <span>%</span>
          </div> -->
          <!-- <input
            type="range"
            bind:value={conversionBoost}
            step="0.1"
            required
            min="0"
            max="10"
            class="[&::-webkit-slider-runnable-track]:bg-blue-gray-100 [&::-moz-range-track]:bg-blue-gray-100 inset-0 w-full cursor-pointer appearance-none bg-transparent [-webkit-appearance:none] focus:outline-none focus:outline-0 [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-20 [&::-moz-range-thumb]:-mt-[3px] [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:ring-2 [&::-moz-range-thumb]:ring-current [&::-moz-range-thumb]:[-webkit-appearance:none] [&::-moz-range-track]:h-full [&::-moz-range-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-webkit-slider-thumb]:-mt-[3px] [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-current [&::-webkit-slider-thumb]:[-webkit-appearance:none]"
          /> -->
        </div>
      </div>
    </div>
  </div>
  <div
    id="Section-2"
    class="w-full rounded-2xl border border-gray-700 bg-gray-900 p-5 shadow-lg sm:p-8"
  >
    <div class="font-display flex h-full flex-col justify-start gap-5">
      <div
        id="Section-2-top-title"
        class="text-center text-lg font-bold capitalize text-white sm:text-lg lg:text-2xl"
      >
        Total ROI Earned from your custom built visual conversion calculator
      </div>
      <div
        class="flex flex-col gap-2 text-sm last:mb-0 min-[350px]:text-base min-[940px]:text-lg"
      >
        <div class="calc-item flex content-center justify-between text-white">
          <div class="calc-item-left basis-5/6 text-left">
            Expected additional revenue per month:
          </div>
          <div class="ml-2 self-center">
            {additionalRevenuePerMonth
              ? `$${additionalRevenuePerMonth.toLocaleString()}`
              : "N/A"}
          </div>
        </div>
        <div class="calc-item flex content-center justify-between text-white">
          <div class="calc-item-left basis-5/6 text-left">
            Expected additional revenue per year:
          </div>
          <div class="ml-2 self-center">
            {additionalRevenuePerYear
              ? `$${additionalRevenuePerYear.toLocaleString()}`
              : "N/A"}
          </div>
        </div>
        <div
          class="calc-item flex content-center justify-between font-bold text-white"
        >
          <div class="calc-item-left basis-5/6 text-left">
            Total Month 1 ROI:
          </div>
          <div class="ml-2 self-center">
            {totalMonth1ROI ? `${totalMonth1ROI.toLocaleString()}%` : "N/A"}
          </div>
        </div>
        <div
          class="calc-item flex content-center justify-between font-bold text-white"
        >
          <div class="calc-item-left basis-5/6 text-left">
            Total Month 12 ROI:
          </div>
          <div class="ml-2 self-center">
            {totalMonth12ROI ? `${totalMonth12ROI.toLocaleString()}%` : "N/A"}
          </div>
        </div>
      </div>
      <a
        class="group relative flex items-center justify-center gap-1 overflow-hidden rounded-md border border-transparent bg-gradient-to-b from-sky-500 to-sky-700 p-3 font-sans font-bold uppercase text-sky-100 transition-all duration-200 hover:from-emerald-500 hover:to-emerald-700 hover:shadow-md hover:shadow-emerald-700"
        href="https://www.facebook.com/joshua.martin.9003/"
        target="_blank"
      >
        <span
          class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-500 ease-in-out group-hover:-translate-x-[700px]"
        ></span>
        <span class="cta-button">Claim Your FREE Mock-Up</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          ></path>
        </svg>
      </a>

      <div
        id="Section-2-bottom"
        class="flex flex-col gap-2 text-sm min-[350px]:text-base min-[940px]:text-lg"
      >
        <div
          class="calc-item-title text-base font-semibold text-white sm:text-lg"
        >
          How did we get these numbers?
        </div>
        <div class="calc-item flex content-center justify-between text-white">
          <div class="calc-item-left basis-5/6 text-left">
            Current monthly revenue({conversionAmount} x ${conversionValue}):
          </div>
          <div class="ml-2 self-center">
            {currRev ? `$${currRev.toLocaleString()}` : "N/A"}
          </div>
        </div>
        <div class="calc-item flex content-center justify-between text-white">
          <div class="calc-item-left basis-4/6 text-left">
            Additional monthly conversions from conversion rate boost:
          </div>
          <div class="ml-2 self-center">
            {additionalConv ? `${additionalConv.toLocaleString()}` : "N/A"}
          </div>
        </div>
        <div class="calc-item flex content-center justify-between text-white">
          <div class="calc-item-left basis-5/6 text-left">
            Current basic calculator cost:
          </div>
          <div class="ml-2 self-center whitespace-nowrap">$300 USD</div>
        </div>
      </div>
    </div>
  </div>
</div>

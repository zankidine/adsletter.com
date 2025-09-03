<script lang="ts">
  import { Link } from '@inertiajs/svelte'
  import { ChevronLeft } from '@lucide/svelte';
  import { PinInput, REGEXP_ONLY_DIGITS} from "bits-ui"
  import Layout from "~/lib/components/layout.svelte"

  let value = $state("");

  //type CellProps = PinInputRootSnippetProps["cells"][0];

  function onComplete() {
    // Todo : handle completion
    value = "";
  }

</script>

<svelte:head>
    <title>Sign In - AdsLetter</title>
</svelte:head>

<Layout>
    <header class="h-[54px] mt-2">
        <nav class="px-4 lg:px-6 flex items-center h-full justify-between">
            <a href="/" class="font-black text-2xl w-fit outline-none">.L.</a>
            <Link href="/signin" class="font-medium outline-none rounded-lg px-6 h-10 flex items-center justify-center leading-10 border hover:bg-primary hover:text-white transition-all duration-300 ease-in-out">Se connecter</Link>
        </nav>
    </header>
    <main class="flex-1 sm:flex items-center pb-16">
        <section class="px-4 w-full pt-16 sm:pt-0">
            <div class="max-w-[360px] w-full h-fit p-4 lg:p-6 mx-auto flex flex-col bg-white rounded-xl">
                <a href="/" class="size-6 overflow-hidden flex items-center justify-center bg-(--bg-primary) rounded-full mb-4">
                    <ChevronLeft size={32} class="opacity-70" />
                </a>
                <div class="flex flex-col gap-1 mb-4">
                    <h1 class="font-bold text-2xl">Saisir le code</h1>
                    <p class="opacity-70 leading-normal">
                        Veuillez saisir le code à 6 chiffres que nous avons envoyé à <strong class="opacity-100 font-semibold">zankidine.abdou60@gmail.com</strong>.
                    </p>
                </div>
                <div>
                    <div>
                        <div class="mb-4 flex flex-col">
                            <label for="email" class="text-sm font-medium mb-1 sr-only">Digit code</label>
                            <PinInput.Root
                                bind:value
                                class="group/pininput has-disabled:opacity-30 flex items-center"
                                maxlength={6}
                                {onComplete}
                                pattern={REGEXP_ONLY_DIGITS}
                            >

                                {#snippet children({ cells })}
                                    <div class="flex gap-1 justify-between w-full">
                                        {#each cells as cell}
                                            <PinInput.Cell class="
                                            focus-override relative text-lg
                                            flex items-center justify-center
                                            transition-all duration-75
                                            outline-0 data-active:outline-1 data-active:outline-primary
                                            text-primary
                                            size-11 border border-(--border-input) rounded-lg" 
                                            {cell}>

                                                {#if cell.char !== null}
                                                    <div>
                                                        {cell.char}
                                                    </div>
                                                {/if}

                                                {#if cell.hasFakeCaret}
                                                    <div
                                                        class="animate-caret-blink pointer-events-none absolute inset-0 flex items-center justify-center"
                                                    >
                                                        <div class="h-8 w-px bg-primary"></div>
                                                    </div>
                                                {/if}
                                            </PinInput.Cell>
                                        {/each}
                                    </div>
                                {/snippet}

                                
                        
                            </PinInput.Root>
                        </div>
                        <div class="flex justify-end">
                            <button class="opacity-70 hover:opacity-100 cursor-pointer leading-normal">Renvoyer le code</button>
                            <span class="opacity-70 leading-normal hidden">Renvoyer le code dans 40s</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</Layout>
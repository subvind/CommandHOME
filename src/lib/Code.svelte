<script lang="ts">
  import { AceEditor } from "svelte-ace";
  import "brace/mode/json";
  import "brace/mode/typescript";
  import "brace/mode/javascript";
  import "brace/mode/sh";
  import "brace/mode/html";
  import "brace/mode/xml";
  import "brace/mode/text";
  import "brace/mode/css";
  import "brace/mode/markdown";
  import "brace/theme/monokai";
  
  export let text: any = null
  export let lang: any = "json";
  let lines: number = 1

  $: text && watchEdit(text)

  function watchEdit (text: string) {
    let count = text.split(/\r\n|\r|\n/).length
    lines = limitNumberWithinRange(count, 1, 20)
  }

  function limitNumberWithinRange(num, min, max) {
    const MIN = min || 1;
    const MAX = max || 20;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
  }

</script>

{#if text !== null}
  <AceEditor
    on:selectionChange={(obj) => console.log(obj.detail)}
    on:paste={(obj) => console.log(obj.detail)}
    on:input={(obj) => watchEdit(obj.detail)}
    on:focus={() => console.log('focus')}
    on:documentChange={(obj) => console.log(`document change : ${obj.detail}`)}
    on:cut={() => console.log('cut')}
    on:cursorChange={() => console.log('cursor change')}
    on:copy={() => console.log('copy')}
    on:init={(editor) => console.log(editor.detail)}
    on:commandKey={(obj) => console.log(obj.detail)}
    on:changeMode={(obj) => console.log(`change mode : ${obj.detail}`)}
    on:blur={() => console.log('blur')}
    width='100%'
    height={`${lines * 16}px`}
    lang={lang}
    theme="monokai"
    bind:value={text} />
  {/if}
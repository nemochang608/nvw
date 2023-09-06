<template>
  <textarea ref="textarea"></textarea>
</template>

<style>
.CodeMirror {
  height: 100%;
  font-family: 'Roboto Mono';
}
</style>

<script>
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jinja2/jinja2';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';

export default {
  mounted() {
    const { textarea } = this.$refs;
    this.cm = CodeMirror.fromTextArea(
      textarea,
      { mode: this.mode, lineNumbers: this.lineNumbers },
    );
    this.refreshintervalid = setInterval(() => { this.cm.refresh(); }, 3000);
  },
  beforeUnmount() {
    clearInterval(this.refreshintervalid);
    this.cm.toTextArea();
  },
  watch: {
    inputValue(val) {
      this.cm.setValue(val);
    },
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: 'null',
    },
    lineNumbers: {
      type: Boolean,
      required: false,
      default: true,
    },
    inputValue: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      refreshintervalid: 0,
      cm: null,
    };
  },
  methods: {
    getValue() {
      return this.cm.getValue();
    },
  },
};
</script>

const breakFile = require('./util/breakFile');

breakFile(`
<template>
</template>
<script>
    // 加点注释
    Page({
        config: {
            "a": 123
        },
        data: {
            aaa: 123
        }
    })
</script>
<style lang="less">
.a {

}
</style>
`);
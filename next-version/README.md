# Next-Version

This action get next version for release.

## Inputs

### `type`

**Required** minor, major, ...

### `pattern`

**Required** RegExp

### `group-index`

**Required** Group index in pattern

### `from`

**Required** tags, packages

## Outputs

### `version`

This is next version

## Example usage

```yaml
uses: actions/hello-world-javascript-action@e76147da8e5c81eaf017dede5645551d4b94427b
with:
  who-to-greet: 'Mona the Octocat'
```

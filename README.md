# react-image-gallery

### Demo  

open [http://braavos.me/react-image-gallery](http://braavos.me/react-image-gallery) in mobile browser and see results

### Usage

```
<Gallery urls={urls}/>
```

#### props

<table>
    <tbody>
        <tr>
            <td>urls</td>
            <td>image urls</td>
        </tr>
        <tr>
            <td>showRange</td>
            <td>show current page / total page</td>
        </tr>
        <tr>
            <td>showArrow</td>
            <td>show navigation arrow</td>
        </tr>
        <tr>
            <td>showCloseBtn</td>
            <td>show close button</td>
        </tr>
        <tr>
            <td>prevArrow</td>
            <td>custom previous arrow node</td>
        </tr>
        <tr>
            <td>nextArrow</td>
            <td>custom next arrow node</td>
        </tr>
        <tr>
            <td colSpan="2">
                events:
            </td>
        </tr>
        <tr>
            <td>onChange(index)</td>
            <td>preview image change event</td>
        </tr>
        <tr>
            <td>onEnd(index)</td>
            <td>at last page, still go right</td>
        </tr>
        <tr>
            <td>onStart(index)</td>
            <td>at first page, still go left</td>
        </tr>
        <tr>
            <td>current</td>
            <td>initial active index page</td>
        </tr>
    </tbody>
</table>
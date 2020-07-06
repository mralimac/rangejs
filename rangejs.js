class rangeJS{
    constructor(idNumber, data)
    {
        this._generalData = data;
        const elementToEdit = document.getElementById(idNumber);
        const containerElement = document.createElement("DIV");
        containerElement.style.marginLeft = "0px";
        containerElement.style.marginRight = "0px";
        containerElement.style.marginBottom = "0px";
        containerElement.style.height = "100px";
        containerElement.style.maxWidth = "100%";
        containerElement.style.width = "100vw;"
        this.createBlocks(containerElement, idNumber);

        elementToEdit.parentElement.replaceChild(containerElement, elementToEdit);
    }



    getColour(index)
    {
        if(this._generalData["colours"] == undefined || this._generalData["colours"].length == 0 || index == null)
        {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        const arrayOfColours = this._generalData["colours"];

        return (arrayOfColours[(index%arrayOfColours.length)]);
    }

    createBlocks(containerElement, idNumber)
    {
        let numberOfBlocks = parseInt(this._generalData["blockCount"]);

        for(let i = 0; i < numberOfBlocks; i++)
        {
            const newBlock = document.createElement("SPAN");
            newBlock.style.backgroundColor = this.getColour(i);
            newBlock.style.display = "inline-block";
            newBlock.style.width = 100/numberOfBlocks+"%";
            newBlock.style.textAlign = "center";
            newBlock.style.overflow = "auto";
            newBlock.style.resize = "horizontal";


            const inputObject = document.createElement("INPUT");
            inputObject.type = "hidden";
            inputObject.name = idNumber+"["+i+"]";

            newBlock.appendChild(inputObject);

            const blockText = document.createElement("SPAN");
            blockText.innerText = Math.round(100/(containerElement.offsetWidth/newBlock.offsetWidth)) + "%";

            newBlock.appendChild(blockText);

            containerElement.appendChild(newBlock);
        }



        for(let y = 0; y < numberOfBlocks; y++)
        {
            let block = containerElement.children[y];


            new ResizeObserver(function(){

                let length = 0;

                for(let b = 0; b < numberOfBlocks; b++)
                {
                    length = length + containerElement.children[b].offsetWidth;
                }

                if(length < block.parentElement.offsetWidth)
                {
                    const inputObject = block.getElementsByTagName("INPUT")[0];
                    inputObject.value = Math.round(100/(block.parentElement.offsetWidth/block.offsetWidth));

                    const blockText = block.getElementsByTagName("SPAN")[0];
                    blockText.innerText = Math.round(100/(block.parentElement.offsetWidth/block.offsetWidth)) + "%";
                    block.style.maxWidth = "";

                }else{
                    block.style.width = block.offsetWidth - 1+"px";
                    block.style.maxWidth = block.offsetWidth+"px";
                }


            }).observe(block);
        }

    }


}
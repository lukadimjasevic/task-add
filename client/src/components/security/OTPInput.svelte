<script lang="ts">
    import { userOTP } from "../../stores/user-otp";

    interface OTPInput {
        name: string;
        value: string;
        ref: null | HTMLInputElement;
    }

    const otpInputs: OTPInput[] = [
        { name: "otp1", value: "", ref: null },
        { name: "otp2", value: "", ref: null },
        { name: "otp3", value: "", ref: null },
        { name: "otp4", value: "", ref: null },
        { name: "otp5", value: "", ref: null },
        { name: "otp6", value: "", ref: null },
    ];

    $: {
        const token = otpInputs.map(otpInput => otpInput.value).join("");
        userOTP.setToken(token);
    }
    
    const handleOnInput = (event: Event, otpInput: OTPInput, index: number) => {
        const value = (event.target as HTMLInputElement).value;
        const numericValue = parseInt(value, 10);
        if (isNaN(numericValue)) {
            (event.target as HTMLInputElement).value = "";
            return;
        }
        if (value.length > 1) {
            otpInput.value = value[1];
        }
        index + 1 > otpInputs.length - 1 ? index = 0 : index++;
        otpInputs[index].ref?.focus();
    }
</script>

<div class="row px-5 py-2">
    {#each otpInputs as otpInput, index}
        <div class="col-2 px-1">
            <input 
                type="number"
                class="form-control"
                name={otpInput.name}
                pattern="[0-9]*"
                min="0"
                max="9"
                maxlength="1"
                required
                bind:this={otpInput.ref}
                bind:value={otpInput.value}
                on:input|preventDefault={(e) => handleOnInput(e, otpInput, index)}
            />
        </div>
    {/each}
</div>

<style>
    input[type="number"] {
        font-size: 2rem;
        text-align: center;
        appearance: textfield;
        -webkit-appearance: textfield;
    }
</style>

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Textarea } from "./ui/textarea";
import { createPost } from "@/app/data/action-members";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]{1,3})?[\s.-]?\(?[0-9]{3}\)?[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/
);

const formSchema = z.object({
    hming: z
        .string()
        .min(3, { message: "Hming pangngai chhut luh tur." }),
    chhungte: z
        .string()
        .min(3, { message: "Chhungte hming pangngai chhut luh tur." }),
    mobile: z
        .string()
        .regex(phoneRegex, "Invalid mobile number format"),
    chhungte_mobile: z
        .string()
        .regex(phoneRegex, "Invalid chhungte mobile number format"),
    pianni: z.date({ message: "Pianni ziahluh a ngai." }),
    veng: z.string(),
    awm_tan_ni: z.date({ message: "Awm tan ni ziahluh a ngai." }),
    hnathawhna: z.string(),
});

export function MemberAddForm() {
    const [pianniOpen, setPianniOpen] = useState(false);
    const [awmTanNiOpen, setAwmTanNiOpen] = useState(false);

    const [today, setTime] = useState<Date | null>(null);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            hming: "",
            chhungte: "",
            mobile: "",
            chhungte_mobile: "",
            pianni: today ? today : new Date("2026-10-01"),
            veng: "",
            awm_tan_ni: today ? today : new Date("2026-10-01"),
            hnathawhna: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        //createTestTable(values)
        createPost(values)
        console.log(values);
        form.reset();
    }



    useEffect(() => {
        // This executes exclusively in the browser after hydration
        setTime(new Date());
    }, []);

    return (
        <form className="m-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="max-w">
                <Controller
                    control={form.control}
                    name="hming"
                    render={({ field, fieldState }) => (
                        <Field className="flex justify-between" aria-invalid={fieldState.invalid} orientation="horizontal">
                            <FieldLabel htmlFor="hming">Hming</FieldLabel>
                            <Input className="w-full/2"
                                placeholder="shadcn"
                                {...field}
                                id="hming"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name="chhungte"
                    render={({ field, fieldState }) => (
                        <Field className="flex justify-between" aria-invalid={fieldState.invalid} orientation="horizontal">
                            <FieldLabel htmlFor="chhungte">Chhungte</FieldLabel>
                            <Input className="w-full/2"
                                {...field}
                                id="chhungte"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name="mobile"
                    render={({ field, fieldState }) => (
                        <Field className="flex justify-between" aria-invalid={fieldState.invalid} orientation="horizontal">
                            <FieldLabel htmlFor="mobile">Mobile</FieldLabel>
                            <Input className="w-full/2"
                                {...field}
                                id="mobile"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name="chhungte_mobile"
                    render={({ field, fieldState }) => (
                        <Field className="flex justify-between" aria-invalid={fieldState.invalid} orientation="horizontal">
                            <FieldLabel htmlFor="chhungte_mobile">Chhungte Mobile</FieldLabel>
                            <Input className="w-full/2"
                                {...field}
                                id="chhungte_mobile"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name="pianni"
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid} orientation="horizontal">
                            <FieldLabel htmlFor="dob">Pianni</FieldLabel>
                            <Popover open={pianniOpen} onOpenChange={setPianniOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date-picker-optional"
                                        className="w-32 justify-between font-normal"
                                    >
                                        {field.value
                                            ? format(field.value, "dd/MM/yyyy")
                                            : "Select date"}
                                        <CalendarIcon data-icon="inline-end" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto overflow-hidden p-0 bg-white text-black border border-gray-200 shadow-2xl"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        captionLayout="dropdown"
                                        defaultMonth={field.value}
                                        onSelect={(date) => {
                                            field.onChange(date);
                                            setPianniOpen(false);
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name="veng"
                    render={({ field, fieldState }) => (
                        <Field className="flex justify-between" aria-invalid={fieldState.invalid} orientation="horizontal">
                            <FieldLabel htmlFor="veng">Veng</FieldLabel>
                            <Textarea className="w-full/2"
                                placeholder="Address puitling ziah luh ni se."
                                {...field}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name="awm_tan_ni"
                    render={({ field, fieldState }) => (
                        <Field aria-invalid={fieldState.invalid} orientation="horizontal">
                            <FieldLabel htmlFor="awm_tan_ni">Awm Tan Ni</FieldLabel>
                            <Popover open={awmTanNiOpen} onOpenChange={setAwmTanNiOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date-picker-optional"
                                        className="w-32 justify-between font-normal"
                                    >
                                        {field.value
                                            ? format(field.value, "dd/MM/yyyy")
                                            : "Select date"}
                                        <CalendarIcon data-icon="inline-end" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto overflow-hidden p-0 bg-white text-black border border-gray-200 shadow-2xl"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        captionLayout="dropdown"
                                        defaultMonth={field.value}
                                        onSelect={(date) => {
                                            field.onChange(date);
                                            setAwmTanNiOpen(false);
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name="hnathawhna"
                    render={({ field, fieldState }) => (
                        <Field className="flex justify-between" aria-invalid={fieldState.invalid} orientation="horizontal">
                            <FieldLabel htmlFor="hnathawhna">Hnathawhna</FieldLabel>
                            <Textarea className="w-full/2"
                                placeholder="Address puitling ziah luh ni se."
                                {...field}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>

            <Button variant="outline" type="submit">Submit</Button>
        </form>
    )
}
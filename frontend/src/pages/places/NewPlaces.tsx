import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { placeSchema, type PlaceFormValues } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import { DUMMY_PLACES } from "../UserPlaces";
import { useEffect } from "react";

const NewPlaces = () => {
  const placeId = useParams().placeId;

  const isEditMode = !!placeId;

  let identifedPlace;

  if (isEditMode) {
    identifedPlace = DUMMY_PLACES.find((place) => place.id === placeId);
  }

  const placeForm = useForm<PlaceFormValues>({
    resolver: zodResolver(placeSchema),
    defaultValues: {
      title: "",
      address: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isEditMode && identifedPlace) {
      placeForm.reset({
        title: identifedPlace?.title,
        address: identifedPlace?.address,
        description: identifedPlace?.description,
      });
    }
  }, [placeId, isEditMode, identifedPlace]);

  const { errors } = placeForm.formState;

  const onSubmit = (values: PlaceFormValues) => {
    if (isEditMode) {
      console.log("Editing place", values);
      return;
    }
    console.log(values);
  };

  if (isEditMode && !identifedPlace) {
    return (
      <Card className="flex items-center justify-center h-40">
        <h2>Could not find the place!</h2>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="">
        <CardTitle className="flex items-center gap-2">Add New Place</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={placeForm.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-4">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    placeholder="Evil Rabbit"
                    {...placeForm.register("title")}
                    aria-invalid={!!errors.title}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="address">Address</FieldLabel>
                  <Input
                    {...placeForm.register("address")}
                    id="address"
                    placeholder="Enter your address"
                    aria-invalid={!!errors.address}
                  />
                </Field>
                {errors.address && (
                  <p className="text-sm text-destructive">
                    {errors.address.message}
                  </p>
                )}
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    {...placeForm.register("description")}
                    id="description"
                    placeholder="Add a description of the place"
                    className="resize-none"
                    aria-invalid={!!errors.description}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description.message}
                    </p>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button type="submit">Submit</Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewPlaces;

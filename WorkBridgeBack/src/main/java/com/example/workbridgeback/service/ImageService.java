package com.example.workbridgeback.service;


import com.example.workbridgeback.dao.ImageModelDao;
import com.example.workbridgeback.entity.ImageModel;
import com.example.workbridgeback.exeptions.ImageNotFound;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


@Service
public class ImageService {
    private final ResourceLoader resourceLoader;


    @Autowired
    private ImageModelDao photoRepo;

    public ImageService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public Set<ImageModel> getDefaultImage() throws IOException {
        String defaultImagePath = "classpath:static/user_1.png";

        // Use ResourceLoader to load the image resource
        Resource resource = resourceLoader.getResource(defaultImagePath);

        // Check if the resource exists
        if (resource.exists()) {
            // Load the image file
            InputStream inputStream = resource.getInputStream();

            // Create an ImageModel from the default image
            ImageModel defaultImageModel = new ImageModel(
                    "default-image.jpg",
                    "image/jpeg", // Adjust the content type based on your default image type
                    IOUtils.toByteArray(inputStream)
            );

            // Create a Set containing the default image
            Set<ImageModel> defaultImageSet = new HashSet<>();
            defaultImageSet.add(defaultImageModel);

            return defaultImageSet;
        } else {
            throw new IOException("Default image not found");
        }
    }





















    public ImageModel getPhoto(Long id) throws ImageNotFound {
        Optional<ImageModel> img = photoRepo.findById(id);
        ImageModel imageModel = img.orElseThrow(()->new ImageNotFound(String.format("Image Not Found")));
        return imageModel;
    }

    public ImageModel save(ImageModel photo) {

        return photoRepo.save(photo);
    }









}
